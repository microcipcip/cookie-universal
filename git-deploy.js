const git = require('simple-git')()
const msg = process.argv[2]

if (process.argv.length !== 3) throw Error(`You passed the wrong number of arguments`)
if (typeof msg !== 'string') throw Error(`You didn't provide a valid msg`)

const deploy = () => {
  console.log(`Trying to commit to your github repository...`)

  git
    .add('./*')
    .commit(msg)
    .push(
      ['-u', 'origin', 'master'],
      () => {
        console.log(`Your commits have been successfully pushed to your github repository`)

        console.log(`-----------------------------------------------------------`)
        console.log(`-----------------------------------------------------------`)

        console.log(`Run 'lerna publish' to publish on npm`)
      }
    )
    .catch((err) => console.error('Commit failed:', err))
}

deploy()
