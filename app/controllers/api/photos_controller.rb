class Api::PhotosController < ApplicationController
  def destroy
    @photo=Photo.find(params[:id])
    if @photo
      @photo.destroy
    end
  end
end
