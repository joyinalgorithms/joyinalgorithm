from django.contrib import admin
from . models import User, Auctionlist, Biddings, Comments
# Register your models here.
admin.site.register(User)
admin.site.register(Auctionlist)
admin.site.register(Biddings)
admin.site.register(Comments)
