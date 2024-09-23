# TODOS
- Update README
- Hot Module Replacement to avoid reloading the page everytime there is a code update
    - version 1 which reloads the page automatically when there is an update saved in code [DONE]
    - version 2 which replaces only those files that are saved with an update
- Kanban board (modules)
- Talk to AI (modules)
    - integrate Gemini and Groq APIs as those keys are already available
    - try generating multiple types of responses like text, images etc.
- Any WebRTC project



How memory works
Latency numbers: https://gist.github.com/jboner/2841832
Magnetic: https://www.youtube.com/watch?v=wtdnatmVdIg
Solid State: https://www.youtube.com/watch?v=5Mh3o886qpg
RAM: https://www.youtube.com/watch?v=7J7X7aZvMXQ
(extra) Brain:
https://www.youtube.com/watch?v=PQDiUKwXLVI
https://www.youtube.com/watch?v=bSycdIx-C48
https://www.youtube.com/watch?v=CQlTmOFM4Qs
Optimizing code for efficient cache usage: https://www.youtube.com/watch?v=BP6NxVxDQIs

Content Delivery Networks (CDN)
Basics:
https://aws.amazon.com/what-is/cdn/
https://www.akamai.com/glossary/what-is-a-cdn
AnyCast: https://www.cloudflare.com/learning/cdn/glossary/anycast-network/
Quick setup guide: https://www.sumologic.com/blog/cdn-aws-cloudfront/
CDN Cache Invalidation:
https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CacheBehavior.html
https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html

Two Phase Commit (2PC)
Theory: https://www.youtube.com/watch?v=-_rdWB9hN1c
Explanation 1: https://www.youtube.com/watch?v=eltn4x788UM
Explanation 2: https://www.youtube.com/watch?v=7FgU1D4EnpQ
Implementation: https://www.youtube.com/watch?v=oMhESvU87jM

MongoDB
Try online: https://mongoplayground.net/
Tutorial: https://www.mongodb.com/docs/manual/tutorial/getting-started/
Docs: https://www.mongodb.com/docs/manual/

Redis
Try online: https://onecompiler.com/redis
Quick start: https://redis.io/learn/howtos/quick-start
Tutorial: https://redis.io/university/
Docs: https://redis.io/docs/latest/
Eviction policies & Cluster mode: https://docs.google.com/document/d/1k4nzubvtX_yLctUT4VWK8ZJt4KCcOEdRJdxQgWCaiU8/

Cassandra
Try online: https://jbcodeforce.github.io/db-play/
Introduction: https://cassandra.apache.org/_/cassandra-basics.html
Case Studies: https://cassandra.apache.org/_/case-studies.html
Architecture - Overview: https://cassandra.apache.org/doc/stable/cassandra/architecture/overview.html
Architecture - Guarantees: https://cassandra.apache.org/doc/stable/cassandra/architecture/guarantees.html
Data Modeling: https://cassandra.apache.org/doc/stable/cassandra/data_modeling/intro.html

Compaction in LSM Trees
https://disc-projects.bu.edu/compactionary/background.html
https://www.alibabacloud.com/blog/an-in-depth-discussion-on-the-lsm-compaction-mechanism_596780
https://www.youtube.com/watch?v=Xzcj663i9DM

Bloom Filters
Quick Demo: https://llimllib.github.io/bloomfilter-tutorial/
Math & Code: https://brilliant.org/wiki/bloom-filter/
Explanation:
https://www.youtube.com/watch?v=Z9_wrhdbSC4
https://www.youtube.com/watch?v=V3pzxngeLqw
https://www.youtube.com/watch?v=gBygn3cVP80
https://www.youtube.com/watch?v=-jiOPKt7avE
Calculate optimal capacity & hashes: https://hur.st/bloomfilter/

Kafka
Basic Terminology: https://www.conduktor.io/kafka/kafka-fundamentals/
Motivation & Opiniated Design: https://kafka.apache.org/documentation/#design
Choosing the number of partitions:
200,000 partitions per cluster limit: https://blogsarchive.apache.org/kafka/entry/apache-kafka-supports-more-partitions
https://www.confluent.io/blog/how-choose-number-topics-partitions-kafka-cluster/
Replication: https://www.conduktor.io/kafka/kafka-topics-choosing-the-replication-factor-and-partitions-count/
