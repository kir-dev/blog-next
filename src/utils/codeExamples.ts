const codeRuby = `class AlbumsController < ApplicationController
  before_action :set_album, only: %i[edit update destroy delete_image add_image image]
  attr_accessor :render_target
  after_action :analyze_album, only: %i[create add_image]

  def image
    image = @album.album_images.find_by(id: params[:image_id])
    return render json: { status: 404 }, status: :not_found if image.blank?

    p "Found image: #{image.file.blob.filename}"
    render json: {
      url: url_for(image),
      filename: image.file.blob.filename
    }
  end

  def delete_image
    image = AlbumImage.find(params[:image_id])
    image.destroy!
    redirect_to @album
  end
end`
const codeJava = `package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

  @Autowired
  private HelloService helloService;

  @GetMapping("/")
  public ResponseEntity<GreetingView> index() {
    final var result = helloService.findAllGreetings();
    if (result == null) System.out.println("ERROR: No greeting found!");
    return result;
  }

}`
const codeCpp = `#include <experimental/net>
#include <boost>
#include <iostream>
#include <string>

using namespace boost::beast;
namespace net = boost::asio;
namespace ssl = boost::asio::ssl;
using tcp = net::ip::tcp;

int main() {
  net::io_context ioc;
  net::any_io_executor work = net::require(
    ioc.get_executor(),
    net::execution::outstanding_work.tracked
  );
  std::thread t {
    [&]() {
      ioc.run();
    }
  };
  error_code ec;
  tcp::socket sock { ioc };
}`
const codeJavaScript = `import React from "react"
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import "./App.css"

export default function App() {
  React.useEffect(() => {
    console.log('Welcome to the App!')
  })

  return (
    <ChakraProvider>
      <main>
        <Hero />
        <About />
        <Services />
        <Groups />
        <Gallery />
        <Footer />
      </main>
    </ChakraProvider>
  )
}`

export { codeCpp, codeJava, codeJavaScript, codeRuby }
