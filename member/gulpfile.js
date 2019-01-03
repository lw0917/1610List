var gulp=require('gulp');
var server=require('gulp-webserver');

  gulp.task('dev',function(){
       return gulp.src('./src')
              .pipe(server({
                  port:9999,
                  proxies:[
                      {
                          source:'/api/list',target:'http://localhost:3000/api/list'
                      },
                      {
                        source:'/api/findOne',target:'http://localhost:3000/api/findOne'
                    },
                    {
                        source:'/api/update',target:'http://localhost:3000/api/update'
                    },
                    {
                        source:'/api/add',target:'http://localhost:3000/api/add'
                    },
                    {
                        source:'/api/del',target:'http://localhost:3000/api/del'
                    }
                  ]
              }))
  })

  gulp.task('default',gulp.series('dev'))