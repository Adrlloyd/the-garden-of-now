import mongoose from 'mongoose'

import {config} from '../config'

mongoose.connect(config.mongoUri);

export {mongoose}