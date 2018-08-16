class Api::PhotosController < ApplicationController
  def destroy
    @photo=Photo.find(params[:id])
    if @photo
      
    end
  end
end
