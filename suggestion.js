const { Client, ChatInputCommandInteraction, EmbedBuilder} = require("discord.js")
const EditReply = require("../../Systems/EditReply")



module.exports = {
    name: "proposta", 
    description: "Proponi una tua idea",
    category: "community",
    options: [
        {
            name: "idea",
            description: "Scrivi la tua idea",
            type: 3, 
            required: true
        }
    ],

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {

        const { options, user} = interaction

        await interaction.deferReply({ ephemeral: true})
        const IdCanaleProposte = client.channels.cache.get("1021420381216714762")
        const proposta = options.getString("idea")

        IdCanaleProposte.send({
            embeds: [
                new EmbedBuilder()
                    .setColor("Fuchsia")
                    .setTitle("Nuova Proposta")
                    .setDescription(`
                    Inviata da: <@${user.id}>
                    Testo: \`${proposta}\`
                    `)
                    .setTimestamp()
                    .setFooter({text: 'Suggestion system'})
            ]
        }).then(async msg => {

            await msg.react("✅")
            await msg.react("❌")
        })

        EditReply(interaction,"✅", "Proposta inviata con successo")

        
    }
}
