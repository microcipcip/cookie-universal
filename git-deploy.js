const simpleGit = require('simple-git')()
const msg = process.argv[2]

if (process.argv.length !== 3) throw Error(`You passed the wrong number of arguments`)
if (typeof msg !== 'string') throw Error(`You didn't provide a valid msg`)

simpleGit
  .add('./*')
  .commit(msg)
  .push(['-u', 'origin', 'master'])

console.log(`Your commits have been successfully pushed to your github repository`)
console.log(`Run 'lerna publish' to publish on npm`)
