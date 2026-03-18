const RESET = '\x1b[0m'
const RED = '\x1b[31m'
// const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const CYAN = '\x1b[36m'
const BOLD = '\x1b[1m'

export const serverConnectionLog = () => {
  console.log('╔══════════════════════════════════════╗')
  console.log('║                                      ║')
  console.log(`║    ${BOLD}🚀 Server Started  ${RESET}               ║`)
  process.env.NODE_ENV === 'development' &&
    console.log(
      `║    🔗 http://localhost:${process.env.PORT || 3000} ${RESET}         ║`,
    )
  console.log('║                                      ║')

  console.log(
    `║    🌐 Port        : ${YELLOW}${
      process.env.PORT || 3000
    }${RESET}             ║`,
  )
  console.log(
    `║    🌱 Environment : ${
      process.env.NODE_ENV === 'development'
        ? CYAN + 'Development'
        : RED + 'Production '
    }${RESET}      ║`,
  )
  console.log('║                                      ║')
  console.log('╚══════════════════════════════════════╝')
}
