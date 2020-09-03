exports.getChatTitle = (ctx) => {
  const {
    message: {
      chat: { title },
    },
  } = ctx;
  return title ? `Название чата - ${title}` : 'Это приватный чат. У него нет названия';
};

exports.createTitleFromCommand = (command) => {
  return command.split(' ').slice(1).join(' ');
};

exports.json = (data) => JSON.stringify(data, null, '\t');

exports.shortener = (string) => {
  const prefix = 'AmW |';
  let titleName = '';

  const havePrefix = string.toUpperCase().includes(prefix.toUpperCase());
  if (havePrefix) {
    console.log(true);
    titleName = string.substring(5);
  } else {
    console.log(false);
    titleName = string;
  }

  const arrayFromString = titleName.trim().split(' ');

  let arrayOfLetters = arrayFromString.map((item) => {
    return item.charAt(0).toUpperCase();
  });

  if (arrayOfLetters.length > 2) {
    arrayOfLetters = arrayOfLetters.slice(0, 2);
  }

  return arrayOfLetters.join('');
};
