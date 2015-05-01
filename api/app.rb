require 'sinatra/base'
require 'mongoid'

require_relative 'helpers'
require_relative 'routes/base'
require_relative 'routes/users'
require_relative 'routes/locations'

class SimpleApp < Sinatra::Base

  set :root, File.dirname(__FILE__)

  enable :sessions
  enable :logging

  # produces a log file and a pipe to stdout
  file = File.new("#{settings.root}/log/#{settings.environment}.log", 'a+')
  file.sync = true

  configure do
    use Rack::CommonLogger, file
    Mongoid.load!('mongoid.yml')
    require 'mongoid'
  end

  helpers Sinatra::SampleApp::Helpers

  # Register your routes here
  register Sinatra::SampleApp::Routing::Users
  register Sinatra::SampleApp::Routing::Locations

  before do
    enable_global_headers
  end

  options '/*' do
    response.headers['Access-Control-Allow-Headers'] = 'accept, Content-Type'
     'true'
  end

end
