<?php 

namespace App\Services;

interface MagayaAPIInterface
{
    public function StartSession(string $user, string $pass): array;
    public function GetEntitiesOfType(int $access_key, int $flags, string $start_with, int $entity_type): array;
    public function GetTransRangeByDate(int $access_key, string $type, string $start_date, string $end_date,  int $flags): array;
    public function SetTransaction(int $access_key, string $type, int $flags, string $data): array;
    public function SetEntity(int $access_key, int $flags, string $entity_xml): array;
    public function GetTransaction(int $access_key, string $entity_type, string $flags, string $number): array;
}