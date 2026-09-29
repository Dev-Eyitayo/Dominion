CREATE TYPE "public"."admin_role" AS ENUM('super_admin', 'editor');--> statement-breakpoint
CREATE TYPE "public"."project_category" AS ENUM('civil', 'electrical', 'solar', 'manufacturing');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('completed', 'ongoing', 'planned');--> statement-breakpoint
CREATE TYPE "public"."manufacturing_category" AS ENUM('poles', 'blocks', 'kerbs', 'drainage', 'custom');--> statement-breakpoint
CREATE TYPE "public"."inquiry_status" AS ENUM('new', 'under_review', 'quoted', 'archived');--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"user_email" varchar(255) NOT NULL,
	"action" varchar(100) NOT NULL,
	"entity" varchar(100) NOT NULL,
	"entity_id" varchar(255),
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"ip_address" varchar(45),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admin_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token" text NOT NULL,
	"ip_address" varchar(45),
	"user_agent" text,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admin_sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "admin_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" "admin_role" DEFAULT 'editor' NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"category" "project_category" NOT NULL,
	"tag" varchar(100) NOT NULL,
	"location" varchar(255) NOT NULL,
	"client" varchar(255),
	"summary" text NOT NULL,
	"content_html" text NOT NULL,
	"content_json" jsonb,
	"featured_image_url" varchar(500) NOT NULL,
	"featured_image_public_id" varchar(255),
	"gallery_images" jsonb DEFAULT '[]'::jsonb,
	"status" "project_status" DEFAULT 'completed' NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "manufacturing_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"category" "manufacturing_category" NOT NULL,
	"technical_specs" jsonb DEFAULT '{}'::jsonb,
	"description_html" text NOT NULL,
	"description_json" jsonb,
	"image_url" varchar(500) NOT NULL,
	"image_public_id" varchar(255),
	"gallery_urls" jsonb DEFAULT '[]'::jsonb,
	"is_available" boolean DEFAULT true NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "manufacturing_products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "engineering_services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"category_badge" varchar(100) NOT NULL,
	"summary" text NOT NULL,
	"deliverables" jsonb DEFAULT '[]'::jsonb,
	"featured_image_url" varchar(500) NOT NULL,
	"featured_image_public_id" varchar(255),
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "engineering_services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "rfq_inquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_name" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"email" varchar(255),
	"service_type" varchar(150) NOT NULL,
	"location" varchar(255) NOT NULL,
	"scope_details" text NOT NULL,
	"status" "inquiry_status" DEFAULT 'new' NOT NULL,
	"admin_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_admin_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admin_sessions" ADD CONSTRAINT "admin_sessions_user_id_admin_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."admin_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "audit_created_at_idx" ON "audit_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "audit_entity_idx" ON "audit_logs" USING btree ("entity");--> statement-breakpoint
CREATE INDEX "projects_category_idx" ON "projects" USING btree ("category");--> statement-breakpoint
CREATE INDEX "projects_is_featured_idx" ON "projects" USING btree ("is_featured");--> statement-breakpoint
CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "projects_display_order_idx" ON "projects" USING btree ("display_order");--> statement-breakpoint
CREATE INDEX "manufacturing_category_idx" ON "manufacturing_products" USING btree ("category");--> statement-breakpoint
CREATE INDEX "manufacturing_is_available_idx" ON "manufacturing_products" USING btree ("is_available");--> statement-breakpoint
CREATE INDEX "manufacturing_display_order_idx" ON "manufacturing_products" USING btree ("display_order");--> statement-breakpoint
CREATE INDEX "services_display_order_idx" ON "engineering_services" USING btree ("display_order");--> statement-breakpoint
CREATE INDEX "inquiries_status_idx" ON "rfq_inquiries" USING btree ("status");--> statement-breakpoint
CREATE INDEX "inquiries_created_at_idx" ON "rfq_inquiries" USING btree ("created_at");