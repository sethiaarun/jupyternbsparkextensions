define(["base/js/namespace", "base/js/events"], function (Jupyter, events) {
  var kernal_name = Jupyter.notebook.kernel.name.toUpperCase();
  var cell_text;
  switch (kernal_name) {
    case "SPARKKERNEL":
      cell_text = `val df = spark.read.format("csv/json/parquet").load("path") \ndf.write.format("csv/json/parquet").save("path")`;
      break;
    case "PYSPARKKERNEL":
      cell_text = `df = spark.read.load("path",format="csv/json/parquet") \ndf.write.save("path",format="csv/json/parquet")`;
      break;
    default:
      cell_text = ``;
  }
  var insert_cell = function () {
    Jupyter.notebook.insert_cell_above("code").set_text(cell_text);
    Jupyter.notebook.select_prev();
    //Jupyter.notebook.execute_cell_and_select_below();
  };
  // Add Toolbar button
  var planetJupyterButton = function () {
    console.log();
    Jupyter.toolbar.add_buttons_group([
      Jupyter.keyboard_manager.actions.register(
        {
          help: "Spark Read,Transform and Save data",
          icon: "fa-paper-plane",
          handler: insert_cell,
        },
        "addsparkreadsave-cell",
        "Spark Read Transform Write"
      ),
    ]);
  };
  // Run on start add jupyter button
  function load_ipython_extension() {
    planetJupyterButton();
  }
  return {
    load_ipython_extension: load_ipython_extension,
  };
});

