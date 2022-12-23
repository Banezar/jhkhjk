module.exports = {

    /**
     * Instructions on how to get this: https://redd.it/40zgse
     */
    yourID: "124161233405476865",

    setupCMD: "/crm",

    /**
     * Delete the 'setupCMD' command after it is ran. Set to 'true' for the command message to be deleted
     */
    deleteSetupCMD: true,

    initialMessage: `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`,

    embedMessage: `
	Click emojis to get/revoke desired role
	`,

    /**
     * Must set this if "embed" is set to true
     */
    embedFooter: "Role Reactions",

    roles: ["tibia", "buzka","pepo"],

    /**
     * For custom emojis, provide the name of the emoji
     */
    reactions: ["❤","😁","pepo"],

    /**
     * Set to "true" if you want all roles to be in a single embed
     */
    embed: true,

    /**
     * Set the embed color if the "embed" variable is et to "true"
     * Format:
     *
     * #dd9323
     */
    embedColor: "#dd9323",

    /**
     * Set to "true" if you want to set a thumbnail in the embed
     */
    embedThumbnail: false,

    /**
     * The link for the embed thumbnail if "embedThumbnail" is set to true
     */
    embedThumbnailLink: "",

};
