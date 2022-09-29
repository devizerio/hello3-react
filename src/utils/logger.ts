import loglevel from 'loglevel'

loglevel.setLevel(loglevel.levels.ERROR)

export const setVerbose = (verbose: boolean) => loglevel.setLevel(verbose ? loglevel.levels.TRACE : loglevel.levels.ERROR)

export const log = loglevel
