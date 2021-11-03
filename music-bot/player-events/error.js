module.exports = (client, error, message) => {

    switch (error) {
        case 'NotPlaying':
            message.channel.send(`${client.emotes.error} - There is no music being played on this server.`);
            break;
        case 'NotConnected':
            message.channel.send(`${client.emotes.error} - You are not connected in a voice channel.`);
            break;
        case 'UnableToJoin':
            message.channel.send(`${client.emotes.error} - I am not able to join your voice channel. Please check my permissions. I must have the Administrator role.`);
            break;
        default:
            message.channel.send(`${client.emotes.error} - Something went wrong ... Error : ${error}`);
    };

};
