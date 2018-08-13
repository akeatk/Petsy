class User < ApplicationRecord
  validate :email_format
  validates :username, :email, :session_token,:score,:num_scores, presence:true, uniqueness:true
  validates :password_digest, presence:true
  validates :password, length: { minimum: 6 }, allow_nil: true

  has_many :items

  after_initialize :ensure_session_token, :ensure_random_username

  def self.valid_email?(email)
    if email.class != String
      return false;
    end
    atIndex = -1
    dotIndex = -1
    (0...email.length).each do |i|
      unless User.is_char?(email[i].ord)
        if email[i] == '@'
          if atIndex < 0 && i > 0
            atIndex = i
          else
            return false
          end
        elsif email[i] == '.'
          if atIndex > 0
            if i < atIndex + 2 || i > email.length - 3
              return false
            else
              dotIndex = i
            end
          end
        else
          return false
        end
      end
    end
    return false if dotIndex < 0
    true
  end

  def self.is_char?(c)
    return false if c.ord < 48 || (c.ord > 57 && c.ord < 66) ||
        (c.ord > 90 && c.ord < 97) || c.ord > 122
    true
  end

  def self.find_by_email(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def self.find_by_username(username, password)
    user = User.find_by(username: username)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    token = SecureRandom.urlsafe_base64
    while User.find_by(session_token: token)
      token = SecureRandom.urlsafe_base64
    end
    token
  end

  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token
    self.session_token = User.generate_session_token
    save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def ensure_random_username
    unless self.username
      self.username = (0...8).map { (65 + rand(26) + (rand(2) * 32)).chr }.join
      while User.find_by(username:username)
        self.username = (0...8).map { (65 + rand(26) + (rand(2) * 32)).chr }.join
      end
      self.username = username
      self.score=0
      self.num_scores=0
    end
  end

  def email_format
    User.valid_email?(self.email)
  end
end
