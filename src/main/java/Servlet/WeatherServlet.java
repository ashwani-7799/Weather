package Servlet;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.net.HttpURLConnection;
import java.net.URL;

@WebServlet("/WeatherServlet")
public class WeatherServlet extends HttpServlet {
    private static final String API_KEY = "de119ad0fbcd31c1d138b67f467f6779"; 
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        
        String city = request.getParameter("city");
        
        if (city == null || city.trim().isEmpty()) {
            out.print("{\"error\": \"City name is required\"}");
            return;
        }
        
        try {
            String apiUrl = String.format("http://api.openweathermap.org/data/2.5/weather?q=%s&units=metric&appid=%s",
                    city, API_KEY);
            
            String apiUrl1 = String.format("http://api.openweathermap.org/data/2.5/weather?q" + city + "&appid=" + API_KEY);
            
            URL url = new URL(apiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            
            BufferedReader reader;
            if (conn.getResponseCode() == 200) {
                reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                reader = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }
            
            StringBuilder response1 = new StringBuilder();
            String line;
            
            while ((line = reader.readLine()) != null) {
                response1.append(line);
            }
            reader.close();
            
            out.print(response1.toString());
            
        } catch (Exception e) {
            out.print("{\"error\": \"Error fetching weather data\"}");
        }
    }
}