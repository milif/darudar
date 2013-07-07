<?
namespace DD\RequireJs;

$_GIT_DIR = __DIR__."/../.git";
$_C_DIR = __DIR__."/../c";

$_bIsDebug = $_GET['debug'];
$_sModule = basename($require);

if($_bIsDebug) {
    $_sRequireScript = file_get_contents(__DIR__.'/../src/vendor/requirejs/require.js');
    $_sRequireScript .= file_get_contents(__DIR__.'/../src/require.config.js');
    $_sRequireScript .= "\nrequire(['$require']);";
    echo "<script type=\"text/javascript\">$_sRequireScript</script>";
} else {
    $_sGitCmd = "git --git-dir ".$_GIT_DIR." log -1";
    
    preg_match('/commit\s([^\s]+)/',`$_sGitCmd`,$_version);
    $_version = $_version[1];
    
    if(!is_file($_C_DIR.'/'.$_sModule.'.'.$_version.".js")) {
        if(!is_dir($_C_DIR)) mkdir($_C_DIR, 0755, true);
        build($_version);
    }
    echo "<link href=\"c/$_sModule.$_version.css\" media=\"all\" rel=\"stylesheet\" type=\"text/css\" />";
    echo "<script src=\"c/$_sModule.$_version.js\" type=\"text/javascript\"></script>";
}

function build($version){
    global $require_build, $_C_DIR, $_sModule;
    
    $_oldVersion = `find $_C_DIR -name '$_sModule.*'`;
    $bHasOld = false;
    foreach(explode("\n", $_oldVersion) as $_file) {
        if(!$_file) continue;
        $bHasOld = true;
        rename($_file, preg_replace('/\.[\w\d]+\./',".$version.",trim($_file)));
    }
    if(!$bHasOld) {
        file_put_contents($_C_DIR."/".$_sModule.".".$version.".css","");
        file_put_contents($_C_DIR."/".$_sModule.".".$version.".js","");
    }
    $sBuildCmd = __DIR__."/build.sh $require_build $_sModule $version";
    exec(sprintf("%s > %s 2>&1 & echo $! >> %s", $sBuildCmd, $_C_DIR.'/builder.log', tempnam($_C_DIR, "builder")));
}
