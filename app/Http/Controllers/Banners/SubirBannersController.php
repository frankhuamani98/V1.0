<?php
 
 namespace App\Http\Controllers\Banners;
 
 use App\Http\Controllers\Controller;
 use Inertia\Inertia;
 
 class SubirBannersController extends Controller
 {
     public function index()
     {
         return Inertia::render('Dashboard/Banners/SubirBanners');
     }
 }