using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<AppMusic> Music { get; set; }
        // public DbSet<Product> Products { get; set; }
        // public DbSet<Merchandise> Merchandise { get; set; }
        // public DbSet<Order> Orders { get; set; }
        // public DbSet<OrderDetail> OrderDetails { get; set; }
        // public DbSet<Tag> Tags { get; set; }
        // public DbSet<ProductTag> ProductTags { get; set; }
        public DbSet<Photo> Photos { get; set; }

        
//  protected override void OnModelCreating(ModelBuilder modelBuilder)
// {
// //one-to-many relationships:
//     modelBuilder.Entity<Order>()
//     .HasMany(o => o.OrderDetails)
//     .WithOne(oi => oi.Order)
//     .HasForeignKey(oi => oi.OrderId);

// 	modelBuilder.Entity<AppUser>()
//     .HasMany(u => u.Orders)
//     .WithOne(o => o.User)
//     .HasForeignKey(o => o.UserId);

// 	modelBuilder.Entity<Product>()
//     .HasMany(p => p.OrderDetails)
//     .WithOne(oi => oi.Product)
//     .HasForeignKey(oi => oi.ProductId);

// 	modelBuilder.Entity<Tag>()
//     .HasMany(t => t.ProductTags)
//     .WithOne(pt => pt.Tag)
//     .HasForeignKey(pt => pt.TagId);

// //one-to-one relationships:
//    modelBuilder.Entity<Product>()
//     .HasOne(p => p.Music)
//     .WithOne()
//     .HasForeignKey<AppMusic>(mf => mf.ProductId);

// modelBuilder.Entity<Product>()
//     .HasOne(p => p.Merchandise)
//     .WithOne()
//     .HasForeignKey<Merchandise>(m => m.ProductId);

// //many-to-many relationships:
//     modelBuilder.Entity<Product>()
//     .HasMany(p => p.Tags)
//     .WithOne(pt => pt.Product)
//     .HasForeignKey(pt => pt.ProductId);

// }
    }
}