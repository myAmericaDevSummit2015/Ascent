require 'mongoid'
require_relative '../models/location'
require_relative '../models/user'
class LocationsImpl

  SECONDS_IN_DAY = 86400

  def get_user_locations(userName)

    user_location_with_clan = []
    if userName
      user = User.only(:clan).where(userName: userName).first
      user_location = Location.where(user_name: userName)
      #set clan to locations
      user_location.each do |location|
        location[:clan] = user[:clan]
        user_location_with_clan << location
      end
      return user_location_with_clan
    else
      #get username and clan from users collection to build a lookup hash
      users = User.only(:userName, :clan).all
      user_clan_hash = {}
      users.each do |user|
        user_clan_hash[user[:user_name]] = user[:clan]
      end

      #set clan to locations
      user_location = Location.all
      user_location.each do |location|
        location_user_name = location[:user_name]
          location[:clan] = user_clan_hash[location_user_name]
          user_location_with_clan << location
      end
      return user_location_with_clan
    end
  end


  def create_location(params)
    now_seconds = Time.now.to_i
    user = User.where(user_name: params['userName']).first

    if user.nil?
      return 'The specified user does not exist'
    else
      prev_location = Location.where(user_name: params['userName'], recarea_id: params['recAreaId']).first
      if prev_location
        prev_location_seconds = prev_location[:timestamp].to_i
        if (now_seconds - prev_location_seconds) < SECONDS_IN_DAY
          return 'It has been less than one day since checking in at this recreation area. Please try to check in after ' +
              (now_seconds - prev_location_seconds).to_s + ' seconds, or visit a different area in the meantime.'
        end
      end
    end

    location = Location.new
    user = User.where(userName: params['userName']).first

    location.users.push(user)
    location.userName = params['userName']
    location.latitude = params['latitude']
    location.longitude = params['longitude']
    location.recAreaId = params['recAreaId']
    location.timestamp = Time.now
    location.score = params['score'] || 1
    location.fromCamera = params['fromCamera']
    location.insert

    user.update_attribute(:score, (user[:score] + params['score']))

    return 'Location added for user'
  end
end