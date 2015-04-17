var API_URL = 'http://104.236.234.157:1337';

angular.module('app.services.models.status', [])

.service('Status', [
             '$http',
    function ($http) {

        return {
            create: create,
            getAll: getAll,
            update: update,
            remove: remove
        }

        function create(device) {
            return $http.post(getUrl('/status'), device)
        }

        function getAll() {
            return $http.get(getUrl('/status'));
        }

        function update(device) {
            return $http.post(getUrl('/status/' + device.id), device);
        }

        function remove(device) {
            return $http.delete(getUrl('/status/' + device.id));
        }

        function getUrl(path) {
            return API_URL + path;
        }
    }
])
