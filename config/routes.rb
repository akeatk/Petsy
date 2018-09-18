Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :show, :update, :edit]

    resources :cart_items, only: [:create, :index, :update]

    resources :reviews, only: [:create, :update, :destroy]

    resources :items, only: [:create, :show, :index, :destroy,:edit, :update]
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#root'
end
