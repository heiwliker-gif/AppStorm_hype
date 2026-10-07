const { withMainActivity } = require('@expo/config-plugins');

const factoryImport = 'import com.swmansion.rnscreens.fragment.restoration.RNScreensFragmentFactory';

module.exports = function withRNScreensFragmentFactory(config) {
  return withMainActivity(config, (modConfig) => {
    if (modConfig.modResults.language !== 'kt') return modConfig;

    let { contents } = modConfig.modResults;
    if (!contents.includes(factoryImport)) {
      contents = contents.replace('import android.os.Bundle', `import android.os.Bundle\n\n${factoryImport}`);
    }

    const superOnCreate = '    super.onCreate(null)';
    if (!contents.includes('supportFragmentManager.fragmentFactory')) {
      if (!contents.includes(superOnCreate)) {
        throw new Error('Could not find MainActivity.onCreate for the react-native-screens setup.');
      }
      contents = contents.replace(
        superOnCreate,
        `    supportFragmentManager.fragmentFactory = RNScreensFragmentFactory()\n${superOnCreate}`,
      );
    }

    modConfig.modResults.contents = contents;
    return modConfig;
  });
};
