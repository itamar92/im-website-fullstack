using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class updateMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductTags_Music_AppMusicId",
                table: "ProductTags");

            migrationBuilder.DropTable(
                name: "Music");

            migrationBuilder.DropIndex(
                name: "IX_ProductTags_AppMusicId",
                table: "ProductTags");

            migrationBuilder.DropColumn(
                name: "AppMusicId",
                table: "ProductTags");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppMusicId",
                table: "ProductTags",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Music",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    artist = table.Column<string>(type: "TEXT", nullable: true),
                    description = table.Column<string>(type: "TEXT", nullable: true),
                    filename = table.Column<string>(type: "TEXT", nullable: true),
                    price = table.Column<decimal>(type: "TEXT", nullable: false),
                    public_id = table.Column<string>(type: "TEXT", nullable: true),
                    quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    url = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Music", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductTags_AppMusicId",
                table: "ProductTags",
                column: "AppMusicId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductTags_Music_AppMusicId",
                table: "ProductTags",
                column: "AppMusicId",
                principalTable: "Music",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
