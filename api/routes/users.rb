require 'sinatra'
require 'mongoid'
require_relative '../models/user'
require_relative '../app/users_impl'

module Sinatra
  module SampleApp
    module Routing
      module Users
        def self.registered(app)

          users_impl = UsersImpl.new

          # Returns either:
          # 1) A list of all users, when no parameters are provided
          # 2) A single user, when a userName is provided
          # 3) A list of all users given a particular clan
          #
          get_users = lambda do
            users_impl.get_users(params['userName'], params['clan']).to_json(except: :_id)
          end

          # Creates a user, unless the userName already exists
          #
          post_user = lambda do
            users_impl.post_user(JSON.parse(request.body.read)).to_json
          end

          # Gets the top number of users for a specified clan
          # The number of returned users is limited by the quantity parameter
          #
          get_top_users_for_clan = lambda do
            users_impl.get_top_users_for_clan(params['clan'], params['quantity']).to_json(except: :_id)
          end

          app.get '/users', &get_users
          app.get '/users/leaderboards', &get_top_users_for_clan
          app.post '/users', &post_user

        end
      end
    end
  end
end