# -*- coding: utf-8 -*-

# System imports
import arrow
import pymongo
from pymongo import ReturnDocument

# Django imports
from django.db import models

# Client imports
from utils.mongo import goods
from utils.mongo import organization
from utils.mongo import user


class Goods:
    def __init__(self, obj):
        self._obj = obj
        self.category = obj.get("category")
        self.organization = obj.get("organization")
        self.data = obj.get("data")

    def insert(self, data):
        try:
            inserted = goods.insert_one(data)
        except pymongo.errors.DuplicateKeyError:
            result = goods.find_one_and_update(
                {"$set":
                    {
                        "category": data.get("category"),
                        "organization": data.get("organization"),
                        "data": data.get("data"),
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

    def update(self, data):
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
            return cls(result)
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
