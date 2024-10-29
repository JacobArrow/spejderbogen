// vite.config.js
import { sveltekit } from "file:///workspaces/spejderbogen/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import preprocess from "file:///workspaces/spejderbogen/node_modules/svelte-preprocess/dist/index.js";
import path from "path";
var config = {
  plugins: [
    sveltekit({
      preprocess: [
        preprocess({
          postcss: true
        })
      ]
    })
  ],
  resolve: {
    alias: {
      $components: path.resolve("./src/lib/components"),
      $data: path.resolve("./src/lib/data"),
      $functions: path.resolve("./src/lib/functions")
    }
  }
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvd29ya3NwYWNlcy9zcGVqZGVyYm9nZW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi93b3Jrc3BhY2VzL3NwZWpkZXJib2dlbi92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vd29ya3NwYWNlcy9zcGVqZGVyYm9nZW4vdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnO1xuaW1wb3J0IHByZXByb2Nlc3MgZnJvbSAnc3ZlbHRlLXByZXByb2Nlc3MnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IGNvbmZpZyA9IHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHN2ZWx0ZWtpdCh7XG4gICAgICAgICAgICBwcmVwcm9jZXNzOiBbXG4gICAgICAgICAgICAgICAgcHJlcHJvY2Vzcyh7XG4gICAgICAgICAgICAgICAgICAgIHBvc3Rjc3M6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSlcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICRjb21wb25lbnRzOiBwYXRoLnJlc29sdmUoJy4vc3JjL2xpYi9jb21wb25lbnRzJyksXG4gICAgICAgICAgICAkZGF0YTogcGF0aC5yZXNvbHZlKCcuL3NyYy9saWIvZGF0YScpLFxuICAgICAgICAgICAgJGZ1bmN0aW9uczogcGF0aC5yZXNvbHZlKCcuL3NyYy9saWIvZnVuY3Rpb25zJylcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZzsiXSwKICAibWFwcGluZ3MiOiAiO0FBQTBQLFNBQVMsaUJBQWlCO0FBQ3BSLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sVUFBVTtBQUVqQixJQUFNLFNBQVM7QUFBQSxFQUNYLFNBQVM7QUFBQSxJQUNMLFVBQVU7QUFBQSxNQUNOLFlBQVk7QUFBQSxRQUNSLFdBQVc7QUFBQSxVQUNQLFNBQVM7QUFBQSxRQUNiLENBQUM7QUFBQSxNQUNMO0FBQUEsSUFDSixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsYUFBYSxLQUFLLFFBQVEsc0JBQXNCO0FBQUEsTUFDaEQsT0FBTyxLQUFLLFFBQVEsZ0JBQWdCO0FBQUEsTUFDcEMsWUFBWSxLQUFLLFFBQVEscUJBQXFCO0FBQUEsSUFDbEQ7QUFBQSxFQUNKO0FBQ0o7QUFFQSxJQUFPLHNCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=
