import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrations1631542483503 implements MigrationInterface {
    name = 'Migrations1631542483503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_users" (
                "id" uuid PRIMARY KEY NOT NULL,
                "email" varchar NOT NULL,
                "firstName" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now()),
                "channel" uuid NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_users"(
                    "id",
                    "email",
                    "firstName",
                    "created_at",
                    "updated_at",
                    "channel"
                )
            SELECT "id",
                "email",
                "firstName",
                "created_at",
                "updated_at",
                "channel"
            FROM "users"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_users"
                RENAME TO "users"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_videos" (
                "id" uuid PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now()),
                "channel" uuid NOT NULL,
                "tags" uuid NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_videos"(
                    "id",
                    "title",
                    "description",
                    "created_at",
                    "updated_at",
                    "channel",
                    "tags"
                )
            SELECT "id",
                "title",
                "description",
                "created_at",
                "updated_at",
                "channel",
                "tags"
            FROM "videos"
        `);
        await queryRunner.query(`
            DROP TABLE "videos"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_videos"
                RENAME TO "videos"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_channels" (
                "id" uuid PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now()),
                "user" uuid NOT NULL,
                "videos" uuid NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_channels"(
                    "id",
                    "name",
                    "created_at",
                    "updated_at",
                    "user",
                    "videos"
                )
            SELECT "id",
                "name",
                "created_at",
                "updated_at",
                "user",
                "videos"
            FROM "channels"
        `);
        await queryRunner.query(`
            DROP TABLE "channels"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_channels"
                RENAME TO "channels"
        `);
        await queryRunner.query(`
            CREATE TABLE "videos_tags_tags" (
                "videosId" varchar NOT NULL,
                "tagsId" varchar NOT NULL,
                PRIMARY KEY ("videosId", "tagsId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_8b6a4888be709b948adfe0c04b" ON "videos_tags_tags" ("videosId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c9491156c7e0a9f80d16a56a92" ON "videos_tags_tags" ("tagsId")
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_users" (
                "id" uuid PRIMARY KEY NOT NULL,
                "email" varchar NOT NULL,
                "firstName" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now())
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_users"(
                    "id",
                    "email",
                    "firstName",
                    "created_at",
                    "updated_at"
                )
            SELECT "id",
                "email",
                "firstName",
                "created_at",
                "updated_at"
            FROM "users"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_users"
                RENAME TO "users"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_videos" (
                "id" uuid PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now())
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_videos"(
                    "id",
                    "title",
                    "description",
                    "created_at",
                    "updated_at"
                )
            SELECT "id",
                "title",
                "description",
                "created_at",
                "updated_at"
            FROM "videos"
        `);
        await queryRunner.query(`
            DROP TABLE "videos"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_videos"
                RENAME TO "videos"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_channels" (
                "id" uuid PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now())
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_channels"("id", "name", "created_at", "updated_at")
            SELECT "id",
                "name",
                "created_at",
                "updated_at"
            FROM "channels"
        `);
        await queryRunner.query(`
            DROP TABLE "channels"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_channels"
                RENAME TO "channels"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_videos" (
                "id" uuid PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now()),
                "channelId" varchar
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_videos"(
                    "id",
                    "title",
                    "description",
                    "created_at",
                    "updated_at"
                )
            SELECT "id",
                "title",
                "description",
                "created_at",
                "updated_at"
            FROM "videos"
        `);
        await queryRunner.query(`
            DROP TABLE "videos"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_videos"
                RENAME TO "videos"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_channels" (
                "id" uuid PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now()),
                "userId" varchar,
                CONSTRAINT "UQ_d9334c0bba535e6eace21a9f43e" UNIQUE ("userId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_channels"("id", "name", "created_at", "updated_at")
            SELECT "id",
                "name",
                "created_at",
                "updated_at"
            FROM "channels"
        `);
        await queryRunner.query(`
            DROP TABLE "channels"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_channels"
                RENAME TO "channels"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_users" (
                "id" varchar PRIMARY KEY NOT NULL,
                "email" varchar NOT NULL,
                "firstName" varchar NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                CONSTRAINT "UQ_75180bd8e62d624af9fa502f352" UNIQUE ("email")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_users"(
                    "id",
                    "email",
                    "firstName",
                    "created_at",
                    "updated_at"
                )
            SELECT "id",
                "email",
                "firstName",
                "created_at",
                "updated_at"
            FROM "users"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_users"
                RENAME TO "users"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_tags" (
                "id" varchar PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                CONSTRAINT "UQ_6edd5980b68c4e83ca6471d739b" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_tags"("id", "name", "created_at", "updated_at")
            SELECT "id",
                "name",
                "created_at",
                "updated_at"
            FROM "tags"
        `);
        await queryRunner.query(`
            DROP TABLE "tags"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_tags"
                RENAME TO "tags"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_videos" (
                "id" varchar PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "channelId" varchar
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_videos"(
                    "id",
                    "title",
                    "description",
                    "created_at",
                    "updated_at",
                    "channelId"
                )
            SELECT "id",
                "title",
                "description",
                "created_at",
                "updated_at",
                "channelId"
            FROM "videos"
        `);
        await queryRunner.query(`
            DROP TABLE "videos"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_videos"
                RENAME TO "videos"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_channels" (
                "id" varchar PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "userId" varchar,
                CONSTRAINT "UQ_d9334c0bba535e6eace21a9f43e" UNIQUE ("userId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_channels"(
                    "id",
                    "name",
                    "created_at",
                    "updated_at",
                    "userId"
                )
            SELECT "id",
                "name",
                "created_at",
                "updated_at",
                "userId"
            FROM "channels"
        `);
        await queryRunner.query(`
            DROP TABLE "channels"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_channels"
                RENAME TO "channels"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_videos" (
                "id" varchar PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "channelId" varchar,
                CONSTRAINT "FK_16909a0ae1ace805503fe874dde" FOREIGN KEY ("channelId") REFERENCES "channels" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_videos"(
                    "id",
                    "title",
                    "description",
                    "created_at",
                    "updated_at",
                    "channelId"
                )
            SELECT "id",
                "title",
                "description",
                "created_at",
                "updated_at",
                "channelId"
            FROM "videos"
        `);
        await queryRunner.query(`
            DROP TABLE "videos"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_videos"
                RENAME TO "videos"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_channels" (
                "id" varchar PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "userId" varchar,
                CONSTRAINT "UQ_d9334c0bba535e6eace21a9f43e" UNIQUE ("userId"),
                CONSTRAINT "FK_b89f82f218818e3d7e0a09b65d2" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_channels"(
                    "id",
                    "name",
                    "created_at",
                    "updated_at",
                    "userId"
                )
            SELECT "id",
                "name",
                "created_at",
                "updated_at",
                "userId"
            FROM "channels"
        `);
        await queryRunner.query(`
            DROP TABLE "channels"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_channels"
                RENAME TO "channels"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_8b6a4888be709b948adfe0c04b"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_c9491156c7e0a9f80d16a56a92"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_videos_tags_tags" (
                "videosId" varchar NOT NULL,
                "tagsId" varchar NOT NULL,
                CONSTRAINT "FK_8b6a4888be709b948adfe0c04b4" FOREIGN KEY ("videosId") REFERENCES "videos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_c9491156c7e0a9f80d16a56a926" FOREIGN KEY ("tagsId") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("videosId", "tagsId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_videos_tags_tags"("videosId", "tagsId")
            SELECT "videosId",
                "tagsId"
            FROM "videos_tags_tags"
        `);
        await queryRunner.query(`
            DROP TABLE "videos_tags_tags"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_videos_tags_tags"
                RENAME TO "videos_tags_tags"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_8b6a4888be709b948adfe0c04b" ON "videos_tags_tags" ("videosId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c9491156c7e0a9f80d16a56a92" ON "videos_tags_tags" ("tagsId")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_c9491156c7e0a9f80d16a56a92"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_8b6a4888be709b948adfe0c04b"
        `);
        await queryRunner.query(`
            ALTER TABLE "videos_tags_tags"
                RENAME TO "temporary_videos_tags_tags"
        `);
        await queryRunner.query(`
            CREATE TABLE "videos_tags_tags" (
                "videosId" varchar NOT NULL,
                "tagsId" varchar NOT NULL,
                PRIMARY KEY ("videosId", "tagsId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "videos_tags_tags"("videosId", "tagsId")
            SELECT "videosId",
                "tagsId"
            FROM "temporary_videos_tags_tags"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_videos_tags_tags"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c9491156c7e0a9f80d16a56a92" ON "videos_tags_tags" ("tagsId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_8b6a4888be709b948adfe0c04b" ON "videos_tags_tags" ("videosId")
        `);
        await queryRunner.query(`
            ALTER TABLE "channels"
                RENAME TO "temporary_channels"
        `);
        await queryRunner.query(`
            CREATE TABLE "channels" (
                "id" varchar PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "userId" varchar,
                CONSTRAINT "UQ_d9334c0bba535e6eace21a9f43e" UNIQUE ("userId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "channels"(
                    "id",
                    "name",
                    "created_at",
                    "updated_at",
                    "userId"
                )
            SELECT "id",
                "name",
                "created_at",
                "updated_at",
                "userId"
            FROM "temporary_channels"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_channels"
        `);
        await queryRunner.query(`
            ALTER TABLE "videos"
                RENAME TO "temporary_videos"
        `);
        await queryRunner.query(`
            CREATE TABLE "videos" (
                "id" varchar PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "channelId" varchar
            )
        `);
        await queryRunner.query(`
            INSERT INTO "videos"(
                    "id",
                    "title",
                    "description",
                    "created_at",
                    "updated_at",
                    "channelId"
                )
            SELECT "id",
                "title",
                "description",
                "created_at",
                "updated_at",
                "channelId"
            FROM "temporary_videos"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_videos"
        `);
        await queryRunner.query(`
            ALTER TABLE "channels"
                RENAME TO "temporary_channels"
        `);
        await queryRunner.query(`
            CREATE TABLE "channels" (
                "id" uuid PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now()),
                "userId" varchar,
                CONSTRAINT "UQ_d9334c0bba535e6eace21a9f43e" UNIQUE ("userId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "channels"(
                    "id",
                    "name",
                    "created_at",
                    "updated_at",
                    "userId"
                )
            SELECT "id",
                "name",
                "created_at",
                "updated_at",
                "userId"
            FROM "temporary_channels"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_channels"
        `);
        await queryRunner.query(`
            ALTER TABLE "videos"
                RENAME TO "temporary_videos"
        `);
        await queryRunner.query(`
            CREATE TABLE "videos" (
                "id" uuid PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now()),
                "channelId" varchar
            )
        `);
        await queryRunner.query(`
            INSERT INTO "videos"(
                    "id",
                    "title",
                    "description",
                    "created_at",
                    "updated_at",
                    "channelId"
                )
            SELECT "id",
                "title",
                "description",
                "created_at",
                "updated_at",
                "channelId"
            FROM "temporary_videos"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_videos"
        `);
        await queryRunner.query(`
            ALTER TABLE "tags"
                RENAME TO "temporary_tags"
        `);
        await queryRunner.query(`
            CREATE TABLE "tags" (
                "id" uuid PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now())
            )
        `);
        await queryRunner.query(`
            INSERT INTO "tags"("id", "name", "created_at", "updated_at")
            SELECT "id",
                "name",
                "created_at",
                "updated_at"
            FROM "temporary_tags"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_tags"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
                RENAME TO "temporary_users"
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid PRIMARY KEY NOT NULL,
                "email" varchar NOT NULL,
                "firstName" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now())
            )
        `);
        await queryRunner.query(`
            INSERT INTO "users"(
                    "id",
                    "email",
                    "firstName",
                    "created_at",
                    "updated_at"
                )
            SELECT "id",
                "email",
                "firstName",
                "created_at",
                "updated_at"
            FROM "temporary_users"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_users"
        `);
        await queryRunner.query(`
            ALTER TABLE "channels"
                RENAME TO "temporary_channels"
        `);
        await queryRunner.query(`
            CREATE TABLE "channels" (
                "id" uuid PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now())
            )
        `);
        await queryRunner.query(`
            INSERT INTO "channels"("id", "name", "created_at", "updated_at")
            SELECT "id",
                "name",
                "created_at",
                "updated_at"
            FROM "temporary_channels"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_channels"
        `);
        await queryRunner.query(`
            ALTER TABLE "videos"
                RENAME TO "temporary_videos"
        `);
        await queryRunner.query(`
            CREATE TABLE "videos" (
                "id" uuid PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now())
            )
        `);
        await queryRunner.query(`
            INSERT INTO "videos"(
                    "id",
                    "title",
                    "description",
                    "created_at",
                    "updated_at"
                )
            SELECT "id",
                "title",
                "description",
                "created_at",
                "updated_at"
            FROM "temporary_videos"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_videos"
        `);
        await queryRunner.query(`
            ALTER TABLE "channels"
                RENAME TO "temporary_channels"
        `);
        await queryRunner.query(`
            CREATE TABLE "channels" (
                "id" uuid PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now()),
                "user" uuid NOT NULL,
                "videos" uuid NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "channels"("id", "name", "created_at", "updated_at")
            SELECT "id",
                "name",
                "created_at",
                "updated_at"
            FROM "temporary_channels"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_channels"
        `);
        await queryRunner.query(`
            ALTER TABLE "videos"
                RENAME TO "temporary_videos"
        `);
        await queryRunner.query(`
            CREATE TABLE "videos" (
                "id" uuid PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now()),
                "channel" uuid NOT NULL,
                "tags" uuid NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "videos"(
                    "id",
                    "title",
                    "description",
                    "created_at",
                    "updated_at"
                )
            SELECT "id",
                "title",
                "description",
                "created_at",
                "updated_at"
            FROM "temporary_videos"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_videos"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
                RENAME TO "temporary_users"
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid PRIMARY KEY NOT NULL,
                "email" varchar NOT NULL,
                "firstName" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now()),
                "channel" uuid NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "users"(
                    "id",
                    "email",
                    "firstName",
                    "created_at",
                    "updated_at"
                )
            SELECT "id",
                "email",
                "firstName",
                "created_at",
                "updated_at"
            FROM "temporary_users"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_users"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_c9491156c7e0a9f80d16a56a92"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_8b6a4888be709b948adfe0c04b"
        `);
        await queryRunner.query(`
            DROP TABLE "videos_tags_tags"
        `);
        await queryRunner.query(`
            ALTER TABLE "channels"
                RENAME TO "temporary_channels"
        `);
        await queryRunner.query(`
            CREATE TABLE "channels" (
                "id" uuid PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now()),
                "user" uuid NOT NULL,
                "videos" uuid NOT NULL,
                CONSTRAINT "FK_35c98b5130bf19ce618db33a81c" FOREIGN KEY ("videos") REFERENCES "videos" ("id") ON DELETE
                SET NULL ON UPDATE
                SET NULL,
                    CONSTRAINT "FK_1913c4d54798b4a619f66738bbb" FOREIGN KEY ("user") REFERENCES "users" ("id") ON DELETE
                SET NULL ON UPDATE
                SET NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "channels"(
                    "id",
                    "name",
                    "created_at",
                    "updated_at",
                    "user",
                    "videos"
                )
            SELECT "id",
                "name",
                "created_at",
                "updated_at",
                "user",
                "videos"
            FROM "temporary_channels"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_channels"
        `);
        await queryRunner.query(`
            ALTER TABLE "videos"
                RENAME TO "temporary_videos"
        `);
        await queryRunner.query(`
            CREATE TABLE "videos" (
                "id" uuid PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now()),
                "channel" uuid NOT NULL,
                "tags" uuid NOT NULL,
                CONSTRAINT "FK_57587a1a3b8e77a02185e940299" FOREIGN KEY ("tags") REFERENCES "tags" ("id") ON DELETE
                SET NULL ON UPDATE
                SET NULL,
                    CONSTRAINT "FK_da2c7b137d72653de5d0ceb077a" FOREIGN KEY ("channel") REFERENCES "channels" ("id") ON DELETE
                SET NULL ON UPDATE
                SET NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "videos"(
                    "id",
                    "title",
                    "description",
                    "created_at",
                    "updated_at",
                    "channel",
                    "tags"
                )
            SELECT "id",
                "title",
                "description",
                "created_at",
                "updated_at",
                "channel",
                "tags"
            FROM "temporary_videos"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_videos"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
                RENAME TO "temporary_users"
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid PRIMARY KEY NOT NULL,
                "email" varchar NOT NULL,
                "firstName" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT (now()),
                "updated_at" timestamp NOT NULL DEFAULT (now()),
                "channel" uuid NOT NULL,
                CONSTRAINT "FK_e61b2f660cebb68e7a0dfc64536" FOREIGN KEY ("channel") REFERENCES "channels" ("id") ON DELETE
                SET NULL ON UPDATE
                SET NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "users"(
                    "id",
                    "email",
                    "firstName",
                    "created_at",
                    "updated_at",
                    "channel"
                )
            SELECT "id",
                "email",
                "firstName",
                "created_at",
                "updated_at",
                "channel"
            FROM "temporary_users"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_users"
        `);
    }

}
