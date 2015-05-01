require 'mongoid'

class Clan
  include Mongoid::Document

  field :clan, as: :clan, type: String
  field :score, as: :score, type: Integer

end