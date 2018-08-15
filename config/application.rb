require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Etsyclone
  class Application < Rails::Application
    # User.first.photo.attach(io:File.open('/Users/appacademy/Desktop/as/app/assets/images/cat_square.jpg'),filename:'somg.jpg')
    Aws.use_bundled_cert!
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
