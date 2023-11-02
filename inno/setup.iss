#define APPNAME "Demut"
#define VERSION GetFileVersion("..\demut-electron-vue-template\dist\win-unpacked\" + APPNAME + ".exe")

[Setup]
AppName={#APPNAME}
AppVersion={#VERSION}
DefaultDirName={commonpf}\{#APPNAME}
OutputBaseFilename={#APPNAME}_{#VERSION}
SetupLogging=yes
Uninstallable=yes
SolidCompression=yes
LZMANumBlockThreads=4

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]      
Source: ..\demut-electron-vue-template\dist\win-unpacked\*; DestDir: "{app}"; Flags: recursesubdirs; BeforeInstall: TaskKill('{#APPNAME}.exe')
Source: ..\demut-electron-vue-template\config\app-config.json; DestDir: "{userdocs}\Demut\config"; DestName: config.json; Flags: onlyifdoesntexist uninsneveruninstall
Source: ..\demut-electron-vue-template\src\icons\icon.ico; DestDir: "{app}"
Source: ..\..\final-thesis-audio\build\Release\AudioEndpoints.node; DestDir: "{app}"

[Dirs]
Name: "{userdocs}\Demut\DEMUT_WAV_CLIPS"
Name: "{userdocs}\Demut\config"


[Icons]
Name: "{commondesktop}\{#APPNAME}"; FileName: "{app}\{#APPNAME}.exe"
Name: "{commonstartup}\{#APPNAME}"; Filename: "{app}\{#APPNAME}.exe"

[Code]
procedure TaskKill(FileName: String);
var
  ResultCode: Integer;
begin
  Exec(ExpandConstant('{sys}\taskkill.exe'), '/f /im ' + '"' + FileName + '"', '', SW_HIDE,
    ewWaitUntilTerminated, ResultCode);
end;