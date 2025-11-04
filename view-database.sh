#!/bin/bash
# MongoDB Database Query Script

echo "==================================="
echo "Mon Bondhu Database Data Viewer"
echo "==================================="
echo ""

# Connect to MongoDB
docker exec -it mongodb mongosh <<EOF

// Select database
use monbondhu

print("\n📊 Available Collections:");
print("==========================");
show collections

print("\n\n📋 Health Tips (প্রথম 3টি):");
print("============================");
db.healthtips.find().limit(3).pretty()

print("\n\n🏥 Health Centers:");
print("==================");
db.healthcenters.find().pretty()

print("\n\n📅 Events:");
print("==========");
db.events.find().pretty()

print("\n\n👨‍⚕️ Workers:");
print("=============");
db.workers.find().pretty()

print("\n\n🆘 Help Requests:");
print("==================");
db.helprequests.find().pretty()

print("\n\n📊 Database Statistics:");
print("========================");
print("Health Tips: " + db.healthtips.countDocuments());
print("Health Centers: " + db.healthcenters.countDocuments());
print("Events: " + db.events.countDocuments());
print("Workers: " + db.workers.countDocuments());
print("Help Requests: " + db.helprequests.countDocuments());

EOF

echo ""
echo "==================================="
echo "Query Complete!"
echo "==================================="
