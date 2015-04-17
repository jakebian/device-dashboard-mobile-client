angular.module('app.constants', [])
.constant('statusOptions',
    {
        wip: {
            id: 'wip',
            name: 'WIP',
            color: '#3F51B5'
        },

        sterilization: {
            id: 'sterilization',
            name: 'Seterilization',
            color: '#1565C0'
        },

        transit: {
            id: 'transit',
            name: 'In Transit',
            color: '#558B2F'
        },

        arrived: {
            id: 'arrived',
            name: 'arrived',
            color: '#EF6C00'
        },

        deployed: {
            id: 'deployed',
            name: 'Deployed',
            color: '#E64A19'
        }

    }
);