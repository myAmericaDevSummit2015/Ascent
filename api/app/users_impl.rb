require 'mongoid'
require 'sinatra'

require_relative '../models/user'
require_relative '../models/clan'

class UsersImpl

  def get_users(userName, clan)
    if clan
      User.where(clan: clan)
    elsif userName
      User.where(userName: userName)
    else
      User.all
    end
  end

  def get_users_by_clan(params)
    User.where(clan: params['clan'])
  end

  def get_top_users_for_clan(clan, quantity)
    amount ||= quantity
    amount ||= 10
    if clan
      User.where(clan: clan).limit(amount).desc(:score).without(:clan)
    else
      clans = []
      User.distinct(:clan).each do |clan_name|
        clan_doc = {}
        clan_doc['name'] = clan_name
        users = User.where(clan: clan_name).limit(amount).desc(:score).without(:clan)
        clan_doc['topUsers'] = users
        clan_doc['score'] = users.sum(:score)
        clans << clan_doc
      end
    end
    clans_parent = {}
    clans_parent['clans'] = clans
    return clans_parent
  end

  def post_user(params)
    if User.where(user_name: params['userName']).exists?
      return 'User already exists'
    else
      user = User.new
      user.userName = params['userName']
      user.firstName = params['firstName']
      user.lastName = params['lastName']
      user.clan = params['clan']
      user.score = 0
      user.insert
      return 'User created'
    end
  end
end