require 'mongoid'
require_relative 'location'

class User
  include Mongoid::Document

  store_in collection: 'Users', database: 'mydb', session: 'default'

  field :'userName', as: :user_name, type: String
  field :'firstName', as: :first_name, type: String
  field :'lastName', as: :last_name, type: String
  field :'clan', as: :clan, type: String
  field :'score', as: :score, type: Integer
end