# -*- coding: utf-8 -*-

# System imports
import arrow
import pymongo
from pymongo import ReturnDocument

# Django imports
from django.db import models

# Client imports
from clients.utils.mongo import goods
from clients.utils.mongo import organization
from clients.utils.mongo import user

class Goods:
    def __init__(self, obj):
        self._obj = obj
        self.category = obj.get("cate_text")
        #self.organization = obj.get("organization")
        #self.data = obj.get("data")
        self.data = obj.get("chooseimg")

    @classmethod
    def insert(cls, data):
        try:
            inserted = goods.insert_one(data)
        except pymongo.errors.DuplicateKeyError:
            result = goods.find_one_and_update(
                {"$set":
                    {
                        "category": data.get("category"),
                        #"organization": data.get("organization"),
                        #"data": data.get("data"),
                        "img": data.get("chooseimg")
                    }
                },
                upsert=True,
                return_document=ReturnDocument.AFTER
            )
            return cls(result)

        if inserted.acknowledged:
            data['_id'] = inserted.inserted_id
            return cls(data)
        return None

    @classmethod
    def update(cls, index ,data):
        result = goods.find_one_and_update(
            index, {"$set": data},
            upsert=False,
            return_document=ReturnDocument.AFTER
        )

    def to_json(self):
        return {
            "category": self.category,
            "organization": self.organization,
            "data": self.data
        }

    @classmethod
    def get_by(cls, index={}):
        if not index:
            return None
        result = goods.find(index)
        if result:
            #return cls(result)
            return result
            
        return None

    @classmethod
    def get_multi(cls, index={}, order_by="", order=-1, return_type="obj_l"):
        user_l = []
        results = goods.find(index).sort(order_by, order)
        if return_type == "dict_l":
            return [cls(r).to_json() for r in result]
        else:
            return [cls(r) for r in result]

    @classmethod
    def count(cls, query=None):
        return goods.count(query)

    # TODO: Add create_at: arrow.utcnow().datetime


class Signup:
    
    def insert(self, signup_data):
        inserted = user.insert_one(signup_data)
        print(inserted)

    @classmethod
    def query(cls, index={}):
        if not index:
            return None
        result = list(user.find(index))
        if result:
            return result
        return None
