using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class MusicPhotosUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssetId",
                table: "Photos");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "Music",
                newName: "url");

            migrationBuilder.RenameColumn(
                name: "Tag",
                table: "Music",
                newName: "tag");

            migrationBuilder.RenameColumn(
                name: "FileName",
                table: "Music",
                newName: "filename");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Music",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Artist",
                table: "Music",
                newName: "artist");

            migrationBuilder.RenameColumn(
                name: "PublicId",
                table: "Music",
                newName: "public_id");

            migrationBuilder.RenameColumn(
                name: "AssetId",
                table: "Music",
                newName: "asset_id");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Photos",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT")
                .Annotation("Sqlite:Autoincrement", true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "url",
                table: "Music",
                newName: "Url");

            migrationBuilder.RenameColumn(
                name: "tag",
                table: "Music",
                newName: "Tag");

            migrationBuilder.RenameColumn(
                name: "filename",
                table: "Music",
                newName: "FileName");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Music",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "artist",
                table: "Music",
                newName: "Artist");

            migrationBuilder.RenameColumn(
                name: "public_id",
                table: "Music",
                newName: "PublicId");

            migrationBuilder.RenameColumn(
                name: "asset_id",
                table: "Music",
                newName: "AssetId");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Photos",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<string>(
                name: "AssetId",
                table: "Photos",
                type: "TEXT",
                nullable: true);
        }
    }
}
