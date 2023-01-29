using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<
        AppUser,
        AppRole,
        int, // identified using an int
        IdentityUserClaim<int>, // user claim will int as key
        AppUserRole,  // user role will be mapped to the joint table
        IdentityUserLogin<int>, // user login will int as key
        IdentityRoleClaim<int>, // role claim will int as key
        IdentityUserToken<int> // user token will int as key
        > //DbContext
    {

        public DataContext(DbContextOptions options) : base(options)
        {
        }
        // public DbSet<AppUser> Users { get; set; }
        public DbSet<AppMusic> Music { get; set; }
                public DbSet<Product> Products { get; set; }
                public DbSet<Merchandise> Merchandise { get; set; }
                public DbSet<Order> Orders { get; set; }
                public DbSet<OrderDetail> OrderDetails { get; set; }
                public DbSet<Tag> Tags { get; set; }
                public DbSet<ProductTag> ProductTags { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // configure the relationship between AppUser, AppRole through many2many relationship
            modelBuilder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(aur => aur.User)
                .HasForeignKey(aur => aur.UserId)
                .IsRequired();
            // and the other side of this relationship
            modelBuilder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(aur => aur.Role)
                .HasForeignKey(aur => aur.RoleId)
                .IsRequired();

            // //one-to-many relationships:
                modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderDetails)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId);

            	modelBuilder.Entity<AppUser>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId);

            	modelBuilder.Entity<Product>()
                .HasMany(p => p.OrderDetails)
                .WithOne(oi => oi.Product)
                .HasForeignKey(oi => oi.ProductId);

            	modelBuilder.Entity<Tag>()
                .HasMany(t => t.ProductTags)
                .WithOne(pt => pt.Tag)
                .HasForeignKey(pt => pt.TagId);

            // //one-to-one relationships:
               modelBuilder.Entity<Product>()
                .HasOne(p => p.Music)
                .WithOne(m => m.Product)
                .HasForeignKey<AppMusic>(mf => mf.ProductId);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Merchandise)
                .WithOne(m => m.Product)
                .HasForeignKey<Merchandise>(m => m.ProductId);

            //many-to-many relationships:
                modelBuilder.Entity<Product>()
                .HasMany(p => p.Tags)
                .WithOne(pt => pt.Product)
                .HasForeignKey(pt => pt.ProductId);

        }
    }
}