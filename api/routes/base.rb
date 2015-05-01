module Sinatra
  module SampleApp
    module Routing
      module Base
        def self.registered(app)

          get_api_docs = lambda do
            body File.read('api/docs/api_doc.yml')
          end
          app.get '/api-docs', &get_api_docs
        end
      end
    end
  end
end