"use strict";

var GameEngine = GameEngine || {};

GameEngine.ResourceMap = (function(){

    var _MapEntry = function(name){ this.Asset = name; };

    var _ResourceMap = {};
    var _NumberOutstandingLoads = 0;
    var _LoadCompleteCallback = null;

    var _CheckForAllLoadCompleted = function(){
        if(_NumberOutstandingLoads === 0 && _LoadCompleteCallback !== null){
            var _Callback = _LoadCompleteCallback;
            _LoadCompleteCallback = null;
            _Callback();
        }
    };

    var _SetLoadCompleteCallback = function(callback){
        _LoadCompleteCallback = callback;
        _CheckForAllLoadCompleted();
    };

    var _AsyncLoadRequest = function(name){
        _ResourceMap[name] = new _MapEntry(name);
        _NumberOutstandingLoads++;
    };

    var _AsyncLoadComplete = function(name, loadedAsset){
        if(!_IsAssetLoaded(name)) alert("GameEngine.AsyncLoadComplete: [" + name + "] not in map!");
        _ResourceMap[name].Asset = loadedAsset;
        _NumberOutstandingLoads--;
        _CheckForAllLoadCompleted();
    };

    var _IsAssetLoaded = function(name){
        return name in _ResourceMap;
    };

    var _RetrieveAsset = function(name){
        var _Resource = null;
        if(name in _ResourceMap) _Resource = _ResourceMap[name].Asset;
        return _Resource;
    };

    var _UnloadAsset = function(name){
        if(name in _ResourceMap) delete _ResourceMap[name];
    };

    return {
        AsyncLoadRequest: _AsyncLoadRequest,
        AsyncLoadComplete: _AsyncLoadComplete,
        SetLoadCompleteCallback: _SetLoadCompleteCallback,
        RetrieveAsset: _RetrieveAsset,
        UnloadAsset: _UnloadAsset,
        IsAssetLoaded: _IsAssetLoaded
    };
}());