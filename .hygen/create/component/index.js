module.exports = {
  prompt: ({inquirer}) => {
    const questions = [
      {
        type: 'input',
        name: 'component_name',
        message: 'Specify the Component Name'
      },
      {
        type: 'input',
        name: 'component_tag',
        message: 'Specify the Tag Name'
      },
      {
        type: 'input',
        name: 'dir',
        message: 'Nested Component Directory (Optional)'
      }
    ]


    return inquirer.prompt(questions).then(answers => {
      const {component_name, component_tag, dir} = answers;
      const path = `${dir ? `${dir}/` : ''}${component_name}`;
      const absPath = `src/components/${path}`;
      const tagName = `<Styled${component_tag}></Styled${component_tag}>`
      return {...answers, tagName, path, absPath};
    });
  }
}