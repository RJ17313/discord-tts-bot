const fs = require('fs');

const getFileList = (dirName) => {
	let files = [];
	const items = fs.readdirSync(dirName, { withFileTypes: true });

	for (const item of items) {
		if (item.isDirectory()) {
			files = [
				...files,
				...(getFileList(`${dirName}/${item.name}`)),
			];
		}
		else {
			files.push(`${dirName}/${item.name}`);
		}
	}

	return files;
};

async function convertToLanguageCode(languageCode) {
	switch (languageCode) {
	case 'English (US)': {
		return 'en-US';
	}
	case 'English (UK)': {
		return 'en-GB';
	}
	case 'French (Fr)': {
		return 'fr-FR';
	}
	case 'Spanish (US)': {
		return 'es-US';
	}
	}
}

module.exports = {
	getFileList,
	convertToLanguageCode,
};