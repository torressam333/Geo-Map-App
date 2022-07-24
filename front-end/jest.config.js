module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['js', 'ts', 'vue'],
  snapshotSerializers: ['jest-serializer-vue'],
};
