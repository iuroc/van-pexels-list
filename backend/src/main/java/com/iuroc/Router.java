package com.iuroc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
class Router {
    @GetMapping("/api/photos")
    public Object photos(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "36") int pageSize)
            throws SQLException {
        try (Connection connection = Database.getConn()) {
            PreparedStatement pStatement = connection.prepareStatement("SELECT * FROM \"photo\" LIMIT ? OFFSET ?");
            pStatement.setInt(1, pageSize);
            pStatement.setInt(2, page * pageSize);
            ResultSet resultSet = pStatement.executeQuery();
            List<Photo> urls = new ArrayList<>();
            while (resultSet.next()) {
                Photo photo = new Photo();
                photo.id = resultSet.getInt("id");
                photo.width = resultSet.getInt("width");
                photo.height = resultSet.getInt("height");
                photo.url = resultSet.getString("url");
                photo.photographer = resultSet.getString("photographer");
                photo.photographerUrl = resultSet.getString("photographer_url");
                photo.photographerId = Integer.valueOf(resultSet.getString("photographer_id"));
                photo.avgColor = resultSet.getString("avg_color");
                photo.liked = resultSet.getString("liked");
                photo.alt = resultSet.getString("alt");
                SrcType srcType = new SrcType();
                srcType.original = resultSet.getString("original");
                srcType.large2x = resultSet.getString("large2x");
                srcType.large = resultSet.getString("large");
                srcType.medium = resultSet.getString("medium");
                srcType.small = resultSet.getString("small");
                srcType.portrait = resultSet.getString("portrait");
                srcType.landscape = resultSet.getString("landscape");
                srcType.tiny = resultSet.getString("tiny");
                photo.src = srcType;
                urls.add(photo);
            }
            return urls;
        }
    }
}