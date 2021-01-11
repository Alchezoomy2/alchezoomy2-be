const hostDetails = require('../../host-details.json');

module.exports = (host_id) => {

    let hostObject = {};

    if (hostDetails[host_id]) {
        let hostData = hostDetails[host_id];

        hostObject = {
            name: `${hostData.first_name} ${hostData.last_name}`,
            pic_url: hostData.pic_url,
            color: hostData.color
        }
    } else {
        hostObject = {
            name: 'Alchemy Code Labs',
            pic_url: 'https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_300,w_300,f_auto,q_auto/983693/axmqlpjyo3zmeszdr9qt.png',
            color: '#FFFFFF'
        }

    }

    return hostObject;
}