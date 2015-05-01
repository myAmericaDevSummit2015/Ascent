require 'mongoid'
require_relative 'user'

class Location
  include Mongoid::Document

  store_in collection: 'Locations', database: 'mydb', session: 'default'
  has_and_belongs_to_many :users

  field :'userName', as: :user_name, type: String
  field :'latitude', as: :latitude, type: String
  field :'longitude', as: :longtidue, type: String
  field :'recAreaId', as: :recarea_id, type: String
  field :'timestamp', as: :timestamp, type: Time
  field :'score', as: :score, type: Integer
  field :'fromCamera', as: :from_camera, type: Boolean

end