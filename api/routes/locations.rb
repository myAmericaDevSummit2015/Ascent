require 'sinatra'
require 'mongoid'
require_relative '../models/location'
require_relative '../app/locations_impl'

module Sinatra
  module SampleApp
    module Routing
      module Locations
        def self.registered(app)

          locations_impl = LocationsImpl.new

          # Returns a list of locations associated to a
          # particular user, via the userName parameter
          #
          get_locations = lambda do
            locations_impl.get_user_locations(params['userName']).to_json(except: :_id)
          end

          # Associates a location with a user, as long as the following are true:
          # 1) The userName exists
          # 2) It has been over 24 hours since the user was last associated to the
          #    given location
          #
          # If the score for the location is not provided, it is defaulted to 1
          #
          post_location = lambda do
            locations_impl.create_location(JSON.parse(request.body.read)).to_json
          end

          app.get '/locations', &get_locations
          app.post '/locations', &post_location
        end
      end
    end
  end
end