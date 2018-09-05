# -*- coding: utf-8 -*-

# System imports
import pymongo
from pymongo.collection import Collection
from pymongo.mongo_client import MongoClient

# Client imports
#from welfare.settings import MONGO_URL

MONGO_URI = "mongodb://localhost:27017/"
db_client = MongoClient(MONGO_URI)
db = db_client.welfare

goods = db.goods
organization = db.organization
user = db.user
