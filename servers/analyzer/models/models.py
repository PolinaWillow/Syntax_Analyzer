from sqlalchemy import MetaData, Table, Column, Integer, String, ForeignKey

metaData = MetaData()

text_input = Table(
    "Texts_Input"
)