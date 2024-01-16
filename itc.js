require('dotenv').config();
const { Client, Intents, MessageActionRow, MessageButton } = require('discord.js');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

const colleges = [
  {
    id: '1196576304468856964',
    label: 'GR101',
    roles: {
      'GR101': '1196576304468856964',
    },
  },
  {
    id: '1196576308264706220',
    label: 'AR111',
    roles: {
      'AR111': '1196576308264706220',
    },
  },
  {
    id: '1196576310064062585',
    label: 'EL111',
    roles: {
      'EL111': '1196576310064062585',
    },
  },
  {
    id: '1196576312001822770',
    label: 'TU170',
    roles: {
      'TU170': '1196576312001822770',
    },
  },
  {
    id: '1196576313650192455',
    label: 'MT129',
    roles: {
      'MT129': '1196576313650192455',
    },
  },
  {
    id: '1196576306318553138',
    label: 'AR112',
    roles: {
      'AR112': '1196576306318553138',
    },
  },
  {
    id: '1196580446864158780',
    label: 'EL112',
    roles: {
      'EL112': '1196580446864158780',
    },
  },
  {
    id: '1196576315244032001',
    label: 'TM103',
    roles: {
      'TM103': '1196576315244032001',
    },
  },
  {
    id: '1196576317546700960',
    label: 'MT131',
    roles: {
      'MT131': '1196576317546700960',
    },
  },
  {
    id: '1196576772112781422',
    label: 'TM105',
    roles: {
      'TM105': '1196576772112781422',
    },
  },
  {
    id: '1196576773937303674',
    label: 'MT132',
    roles: {
      'MT132': '1196576773937303674',
    },
  },
  {
    id: '1196576775573098639',
    label: 'TM111',
    roles: {
      'TM111': '1196576775573098639',
    },
  },
  {
    id: '1196576777401806899',
    label: 'TM112',
    roles: {
      'TM112': '1196576777401806899',
    },
  },
  {
    id: '1196576779045969992',
    label: 'M251',
    roles: {
      'M251': '1196576779045969992',
    },
  },
  {
    id: '1196576780576886805',
    label: 'M269',
    roles: {
      'M269': '1196576780576886805',
    },
  },
  {
    id: '1196576782338511008',
    label: 'T215A',
    roles: {
      'T215A': '1196576782338511008',
    },
  },
  {
    id: '1196576784347582474',
    label: 'T215B',
    roles: {
      'T215B': '1196576784347582474',
    },
  },
  {
    id: '1196576786352451624',
    label: 'TM351',
    roles: {
      'TM351': '1196576786352451624',
    },
  },
  {
    id: '1196576787833032725',
    label: 'TM355',
    roles: {
      'TM355': '1196576787833032725',
    },
  },
  {
    id: '1196576789594644551',
    label: 'TM354',
    roles: {
      'TM354': '1196576789594644551',
    },
  },
  {
    id: '1196576791297527858',
    label: 'TM471-A',
    roles: {
      'TM471-A': '1196576791297527858',
    },
  },
  {
    id: '1196576797408624740',
    label: 'CAS400',
    roles: {
      'CAS400': '1196576797408624740',
    },
  },
  {
    id: '1196576799459655750',
    label: 'TM471-B',
    roles: {
      'TM471-B': '1196576799459655750',
    },
  },
];

client.on('ready', async () => {
  try {
    const channel = await client.channels.cache.get('1196528663273938975');
    if (!channel) return;

    const exampleEmbed = {
      color: 0x0099FF,
      title: '..اختار موادك',
      author: {
        name: ' ',
      },
      description: 'يمكنك كذلك رؤية الخطة الدراسية الخاصه بك ⬇️',
      image: {
        url: 'https://i.imgur.com/1amKAjJ.png',
      },
      footer: {
        text: 'يرجى الضغط على الزر ادناه ...',
      },
    };

    channel.send({ embeds: [exampleEmbed] });

    const rows = [];

    colleges.forEach((college, index) => {
      const button = new MessageButton()
        .setCustomId(college.id)
        .setLabel(college.label)
        .setStyle('PRIMARY');

      if (index % 5 === 0) {
        rows.push(new MessageActionRow());
      }

      rows[rows.length - 1].addComponents(button);
    });

    await channel.send({
      content: ' ',
      components: rows,
      ephemeral: true,
    });

    console.log('Buttons sent to the channel.');
  } catch (error) {
    console.error('Error sending buttons:', error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  try {
    const selectedRoleId = interaction.customId;
    const role = interaction.guild.roles.cache.get(selectedRoleId);

    if (role) {
      const hasRole = interaction.member.roles.cache.has(selectedRoleId);

      if (hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.reply({ content: `تم ازالة مادتك ${role.name} بنجاح ❌.`, ephemeral: true });
      } else {
        await interaction.member.roles.add(role);
        await interaction.reply({ content: `تم اختيار مادتك ${role.name} بنجاح ✅.`, ephemeral: true });
      }  
    }
  } catch (error) {
    console.error('Error handling button click:', error);
    await interaction.reply({ content: 'حدثت مشكلة أثناء معالجة الطلب.', ephemeral: true });
  }
});

client.login(process.env.TOKEN);
